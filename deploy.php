<?php
namespace Deployer;

require 'recipe/common.php';

// Project repository
set('repository', 'git@github.com:ambielecki/e28.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

set('shared_files', ['.env', '.env.local']);

set('which-npm', function () {
    return run('which npm');
});

task('copy-node', function () {
    if (has('previous_release')) {
        if (test('[ -d {{previous_release}}/p3//node_modules ]')) {
            run('cp -R {{previous_release}}/p3/node_modules {{release_path}}');
        }
    }
    run("cd {{release_path}}/p3 && {{which-npm}} install --frozen-lockfile");
});

task('npm-build', function () {
    run("cd {{release_path}}/p3 && {{which-npm}} run build");
});

// Hosts
host('137.184.202.43')
    ->set('remote_user', 'ambielecki')
    ->set('deploy_path', '/var/www/2023-beer');

// Hooks
after('deploy:writable', 'copy-node');
after('copy-node', 'npm-build');
after('deploy:failed', 'deploy:unlock');