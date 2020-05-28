<?php
namespace Deployer;

require 'recipe/common.php';

// Project name
set('application', 'e28');

// Project repository
set('repository', 'git@github.com:ambielecki/e28.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
set('shared_files', []);
set('shared_dirs', []);

// Writable dirs by web server 
set('writable_dirs', []);

set('bin/npm', function () {
    return run('which npm');
});

set('default_timeout', 600);

set('keep_releases', 3);

// Hosts

host('andrewbielecki.com')
    ->user('ambielecki')
    ->stage('production')
    ->set('deploy_path', '/var/www/html/e28');
    

// Tasks

desc('Deploy your project');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'e28-env',
    'e28-install',
    'e28-build',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);

task('week9-install', function () {
    if (has('previous_release')) {
        if (test('[ -d {{previous_release}}/week9/node_modules ]')) {
            run('cp -R {{previous_release}}/week9/node_modules {{release_path}}/week9');
        }
    }
    run("cd {{release_path}}/week9 && {{bin/npm}} ci");
});

task('week9-build', function () {
    run("cd {{release_path}}/week9 && {{bin/npm}} run build");
});

task('e28-env', function () {
    run("cp {{deploy_path}}/shared/p2/.env {{release_path}}/p2/.env");
    run("cp {{deploy_path}}/shared/p3/.env {{release_path}}/p3/.env");
});

task('e28-install', function () {
    if (has('previous_release')) {
        if (test('[ -d {{previous_release}}/p2/node_modules ]')) {
            run('cp -R {{previous_release}}/p2/node_modules {{release_path}}/p2');
        }
        if (test('[ -d {{previous_release}}/p3/node_modules ]')) {
            run('cp -R {{previous_release}}/p3/node_modules {{release_path}}/p3');
        }
    }
    run("cd {{release_path}}/p2 && {{bin/npm}} ci");
    run("cd {{release_path}}/p3 && {{bin/npm}} ci");
});

task('e28-build', function () {
    run("cd {{release_path}}/p2 && {{bin/npm}} run build");
    run("cd {{release_path}}/p3 && {{bin/npm}} run build");
});

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
